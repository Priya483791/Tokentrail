
export function createBPESimulation() {
    const originalWords = ['low', 'low', 'low', 'lower', 'lowest']
    let words = originalWords.map(word => word.split(''))
    let step = 0
  
    function getPairs() {
      const frequencies = {}
  
      words.forEach(word => {
        for (let i = 0; i < word.length - 1; i++) {
          const pair = word[i] + '|' + word[i + 1]
          frequencies[pair] = (frequencies[pair] || 0) + 1
        }
      })
  
      return frequencies
    }
  
    function getState() {
      return {
        step,
        words: words.map(word => [...word]),
        pairs: getPairs()
      }
    }
  
    function nextMerge() {
      const pairs = getPairs()
      const entries = Object.entries(pairs)
  
      if (!entries.length) return getState()
  
      entries.sort((a, b) => b[1] - a[1])
  
      const [bestPair] = entries[0]
      const [first, second] = bestPair.split('|')
      const merged = first + second
  
      words = words.map(word => {
        const result = []
        let i = 0
  
        while (i < word.length) {
          if (
            i < word.length - 1 &&
            word[i] === first &&
            word[i + 1] === second
          ) {
            result.push(merged)
            i += 2
          } else {
            result.push(word[i])
            i++
          }
        }
  
        return result
      })
  
      step++
  
      return {
        ...getState(),
        merged,
        frequency: pairs[bestPair],
        message: `Merged "${first}" + "${second}" into "${merged}".`
      }
    }
  
    function reset() {
      words = originalWords.map(word => word.split(''))
      step = 0
      return getState()
    }
  
    return { getState, nextMerge, reset }
  }
  