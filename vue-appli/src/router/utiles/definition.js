const today = new Date();
const this_year = today.getFullYear();

// 配列を変数に格納
const yearList = []
const monthList = []
const dayList = []

// 第一引数〜第二引数までの年月日を生成し、配列（list）に追加する関数を作成
const optionLoop = (start, end, list) => {
    for( let i = start; i <= end; i++)
        list.push(i)
}

optionLoop(1950, this_year, yearList);
optionLoop(1, 12, monthList);
optionLoop(1, 31, dayList);

// 年月日の値のforループを配列に格納し、vueコンポーネントにexportする
export {yearList, monthList, dayList}