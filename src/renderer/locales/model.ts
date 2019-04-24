export interface LocaleData {
  topBar: {
    assistant: string;
    settings: string;
  };
  settings: {
    [key: string]: {
      option: string;
      description: string;
    };
  };
  chat: {};
  bottomBar: {
    placeholder: string;
  };
  wizard: {
    steps: [
      {
        hi: string;
        welcome: string;
      },
      {
        title: string;
        disclaimer: {
          introduction: {
            title: string;
            text: string;
          };
          software: {
            title: string;
            text: string;
          };
          assets: {
            title: string;
            text: string;
          };
          agreement: {
            title: string;
            text: string;
          };
        };
      },
      {
        title: string;
        text: string;
      },
      {
        title: string;
        text: [string, string, string, string];
      },
      {
        title: string;
        text: [string, string];
        idPlaceholder: string;
        secretPlaceholder: string;
      },
    ];
    actions: {
      authorize: string;
      next: string;
    };
  };
}
