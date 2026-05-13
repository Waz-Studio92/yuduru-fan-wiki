document.addEventListener('DOMContentLoaded', async () => {

    // <div id="song-list-body"></div>を探しに行く
    const container = document.getElementById('song-list-body');
    // 見つからなければ終わり
    if (!container) return;

    try {
        //外部のJSONファイルを読みに行く
        const configResponse = await fetch('./assets/data/list.json');
        if (!configResponse.ok) throw new Error('config load failed');
        const data = await configResponse.json()
        const songs = data.songs;

        // 曲のソート
        songs.sort((a, b) => {
            const tieupA = a.tieup && a.tieup.trim() !== "";
            const tieupB = b.tieup && b.tieup.trim() !== "";
            if (tieupA !== tieupB) { return tieupB - tieupA; }
            return a.title.localeCompare(b.title, 'ja', { numeric: true });
        });

        // tdを作る共通関数
        const createTd = (text, className) => {
            const td = document.createElement('td');
            td.textContent = text || "";
            td.className = className;
            return td;
        };
        
        
        songs.forEach(item => {
            // タイトルが空なら処理をスキップ
            if (!item.title?.trim()) return;

            // trを曲ごとに新規作成
            const row = document.createElement('tr');
            console.log('trの作成が完了しました');
            
            row.appendChild(createTd(item.title, 'col-title'));
            row.appendChild(createTd(item.tieup, 'col-up'));
            row.appendChild(createTd(item.produce, 'col-produce'));

            // containerに1行ずつ追加
            container.appendChild(row);
        });

    } catch (e) {
        console.log("処理中にエラーが発生しました", e);
    }
});