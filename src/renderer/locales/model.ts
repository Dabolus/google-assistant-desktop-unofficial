export interface LocaleData {
  topBar: {
    assistant: string;
  };
  chat: {};
  bottomBar: {
    placeholder: string;
  };
  wizard: {
    page0: {
      hi: string;
      welcome: string;
    };
    page1: {
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
    };
    page2: {
      title: string;
      text: [string, string, string, string];
    };
    page3: {
      title: string;
      text: [string, string];
      idPlaceholder: string;
      secretPlaceholder: string;
    };
    actions: {
      authorize: string;
      next: string;
    };
  };
}
