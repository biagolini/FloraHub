export interface AppConfig {
  app: {
    icons: Icons;
  };
  plantas: Record<string, Plant>;
}

export interface Icons {
  [key: string]: string;
}

export interface Plant {
  nome_cientifico: string;
  categoria: string;
  img: string;
  key?: string;
  pt?: Idioma;
  en?: Idioma;
  es?: Idioma;
  [key: string]: any; // Permite indexação dinâmica
}

export interface Idioma {
  nome_popular: string;
  link_wikipedia?: string;
  descricao: string;
  descricao_estendida?: string;
}

export interface DescricaoPlant {
  nome_popular: string;
  link_wikipedia: string;
  descricao: string;
  descricao_estendida?: string; // Opcional, pois nem todas as plantas têm essa propriedade
}
