
import { Topic } from './types';

export const CONSTITUTION_DATA: Topic[] = [
  {
    id: 't1',
    title: 'Princípios Fundamentais (Art. 1º ao 4º)',
    articles: [
      {
        id: 'art1',
        number: 1,
        topic: 'Fundamentos da República',
        content: 'A República Federativa do Brasil, formada pela união indissolúvel dos Estados e Municípios e do Distrito Federal, constitui-se em Estado Democrático de Direito...',
        details: [
          'I - a soberania',
          'II - a cidadania',
          'III - a dignidade da pessoa humana',
          'IV - os valores sociais do trabalho e da livre iniciativa',
          'V - o pluralismo político'
        ]
      },
      {
        id: 'art3',
        number: 3,
        topic: 'Objetivos Fundamentais',
        content: 'Constituem objetivos fundamentais da República Federativa do Brasil:',
        details: [
          'I - construir uma sociedade livre, justa e solidária',
          'II - garantir o desenvolvimento nacional',
          'III - erradicar a pobreza e a marginalização e reduzir as desigualdades sociais e regionais',
          'IV - promover o bem de todos, sem preconceitos de origem, raça, sexo, cor, idade e quaisquer outras formas de discriminação.'
        ]
      }
    ]
  },
  {
    id: 't2',
    title: 'Direitos e Garantias Fundamentais (Art. 5º)',
    articles: [
      {
        id: 'art5',
        number: 5,
        topic: 'Direitos e Deveres Individuais e Coletivos',
        content: 'Todos são iguais perante a lei, sem distinção de qualquer natureza, garantindo-se aos brasileiros e aos estrangeiros residentes no País a inviolabilidade do direito à vida, à liberdade, à igualdade, à segurança e à propriedade...',
        details: [
          'I - homens e mulheres são iguais em direitos e obrigações',
          'II - ninguém será obrigado a fazer ou deixar de fazer alguma coisa senão em virtude de lei',
          'III - ninguém será submetido a tortura nem a tratamento desumano ou degradante'
        ]
      }
    ]
  }
];
