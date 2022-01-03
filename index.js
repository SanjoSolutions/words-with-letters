const WORDS = 'words'

export function generateSearchTree(words) {
  const tree = new Map()
  for (const word of words) {
    const word2 = word.toLowerCase()
      .replaceAll('ä', 'a')
      .replaceAll('ö', 'o')
      .replaceAll('ü', 'u')
      .replaceAll('ß', 'ss')
    const characters = word2.split('')
    characters.sort()
    let subTree = tree
    for (const character of characters) {
      if (subTree.has(character)) {
        subTree = subTree.get(character)
      } else {
        const previousSubtree = subTree
        subTree = new Map()
        previousSubtree.set(character, subTree)
      }
    }
    let wordsWithCharacters
    if (subTree.has(WORDS)) {
      wordsWithCharacters = subTree.get(WORDS)
    } else {
      wordsWithCharacters = new Set()
      subTree.set(WORDS, wordsWithCharacters)
    }
    wordsWithCharacters.add(word)
  }
  return tree
}

export function findWordsWithCharacters(searchTree, characters) {
  characters = characters.map(character => character.toLowerCase())
  characters.sort()

  let subTree = searchTree
  for (const character of characters) {
    if (subTree.has(character)) {
      subTree = subTree.get(character)
    } else {
      return []
    }
  }
  const words = subTree.has(WORDS) ? Array.from(subTree.get(WORDS)) : []
  return words
}

export function findWordsThatCanBeMadeOutOfCharacters(searchTree, characters) {
  characters = characters.map(character => character.toLowerCase())
  const combinations = Array.from(generateCombinations(characters)).filter(sequence => sequence.length >= 3)
  const words = unique(combinations.flatMap(characters => findWordsWithCharacters(searchTree, Array.from(characters))))
  return words
}

function unique(values) {
  return Array.from(new Set(values))
}

export function generateCombinations(values) {
  const array = [...values];
  array.sort();
  const indexSubSequences = getIndexSubSequences(array.length);
  const subSequences = indexSubSequences.map((indexSubSequence) => indexSubSequence.map((index) => array[index]));
  const subSets = subSequences.map((subSequence) => subSequence);
  const result = subSets;
  return result;
}

function getIndexSubSequences(length) {
  let subSequences = [[]];
  const result = [...subSequences];
  do {
    const nextSubSequences = [];
    for (const subSequence of subSequences) {
      const lastValue = subSequence.length > 0 ? subSequence[subSequence.length - 1] : -1;
      for (let value = lastValue + 1; value < length; value++) {
        nextSubSequences.push([...subSequence, value]);
      }
    }
    result.push(...nextSubSequences);
    subSequences = nextSubSequences;
  } while (subSequences.length > 0);
  return result;
}
