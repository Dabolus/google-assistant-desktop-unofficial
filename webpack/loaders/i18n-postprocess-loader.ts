import remark from 'remark';
import html from 'remark-html';
import externalLinks from 'remark-external-links';

const parser = remark()
  .data('settings', {
    commonmark: true,
    footnotes: true,
    pedantic: true,
    gfm: true,
  })
  .use(externalLinks)
  .use(html);

const shortCodes: { [key: string]: string } = {
  'google-logo': '<span class="google-logo">google_logo</span>',
  'assistant-logo': '<span class="assistant-logo">google_assistant</span>',
};

const getHeader = (value: string) => `<div class="heading">${value}</div>`;
const getHeaderPart = (value: string) =>
  value === 'Google' ? '<img src="assets/google-logo.svg">' : getHeader(value);
const getShortCode = (value: string) => shortCodes[value];

const mapMessage = async (key: string, value: string) => {
  switch (key) {
    case 'topBar.assistant':
      const [part1, part2] = value.split(' ');
      return `${getHeaderPart(part1)} ${getHeaderPart(part2)}`;
    case 'topBar.settings':
      return getHeader(value);
    default:
      const { contents } = await parser.process(
        `${value}\n\n` +
          '[assistant-tos]: https://developers.google.com/assistant/sdk/terms-of-service\n' +
          '[source-code]: https://github.com/Dabolus/google-assistant-desktop-unofficial\n' +
          '[projects-page]: https://console.cloud.google.com/project\n' +
          '[assistant-api]: https://console.developers.google.com/apis/api/embeddedassistant.googleapis.com/overview\n' +
          '[people-api]: https://console.developers.google.com/apis/api/people.googleapis.com/overview\n' +
          '[oauth-consent]: https://console.developers.google.com/apis/credentials/consent\n' +
          '[oauth-console]: https://console.developers.google.com/apis/credentials/oauthclient\n',
      );
      const contentsString = contents
        .toString()
        .replace(/(?:google-logo|assistant-logo)/g, getShortCode);
      const paragraphsCount = (contentsString.match(/<p>/g) || []).length;
      return paragraphsCount > 1
        ? contentsString
        : contentsString.replace(/<\/?p>\n?/g, '');
  }
};

export default async (source: string) => {
  const { messages } = eval(source);

  const mappedMessagesKeyVal = await Promise.all(
    Object.entries<string>(messages).map(async ([key, value]) => [
      key,
      await mapMessage(key, value),
    ]),
  );

  const mappedMessages = mappedMessagesKeyVal.reduce(
    (newMessages, [key, value]) => ({
      ...newMessages,
      [key]: value,
    }),
    {},
  );

  const newSource = source.replace(
    /messages:.+/,
    `messages:${JSON.stringify(mappedMessages)}};`,
  );

  return newSource;
};
