export interface Characters {
  id: number;
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  series: {
    items: {
      name: string;
    }[];
  };
  events: {
    items: {
      name: string;
    }[];
  };
}

export interface Comics {
  id: number;
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}
