async function getPokemonData(pokemonName) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
  if (!response.ok) {
    alert(`ポケモンのデータが見つかりません: ${pokemonName}`)
    var retry = prompt(`もう一度ポケモンの名前を入力してください。`)
    if (retry){
        getPokemonData(retry.toLowerCase()) // 小文字にして再試行   
    }
    return; // エラー時はここで終了
}
  const data = await response.json()

  console.log(data) // デバッグ用

  const name = data.name
  const height = data.height
  const weight = data.weight
  const types = data.types.map(typeInfo => typeInfo.type.name).join(', ')  
  const object = document.getElementById('pokemon-output')

    object.innerHTML = `
    ${name} のデータを取得しました。
    <br>高さ: ${height}
    <br>重さ: ${weight}
    <br>タイプ: ${types}
    <br><img src="${data.sprites.front_default}" alt="${name}">
`  
}

// ユーザーに入力させて、そのポケモンを表示
var text = prompt("ポケモンの名前を入力してください。")
if (text) { // キャンセルで空文字にならないように
  getPokemonData(text.toLowerCase()) // 小文字にして検索精度アップ
}