const useFontCategories = () => {

  const categories = [
    // 主要字体类别
    {
      key: 'sans-serif',
      label: 'Sans Serif'
    },
    {
      key: 'serif',
      label: 'Serif'
    },
    {
      key: 'display',
      label: 'Display'
    },
    {
      key: 'handwriting',
      label:'Handwriting',
    },
    {
      key: 'monospace',
      label: 'Monospace',
    },
  ]

  const writingSystems = [
    // 西方语言
    {
      key: 'latin',
      label: 'Latin',
    },
    {
      key: 'latin-ext',
      label: 'Latin Extended',
    },
    // 东亚语言
    {
      key: 'chinese',
      label: 'Chinese',
    },
    {
      key: 'japanese',
      label: 'Japanese',
    },
    {
      key: 'korean',
      label: 'Korean',
    },
    // 其他主要书写系统
    {
      key: 'arabic',
      label: 'Arabic',
    },
    {
      key: 'cyrillic',
      label: 'Cyrillic',
    },
    {
      key: 'devanagari',
      label: 'Devanagari',
    },
    {
      key: 'greek',
      label: 'Greek',
    },
    {
      key: 'hebrew',
      label: 'Hebrew',
    },
  ]

  return [
    ...categories,
    ...writingSystems
  ]
}

export default useFontCategories