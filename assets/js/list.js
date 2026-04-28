document.addEventListener('DOMContentLoaded', () => {
    const logContainer = document.getElementById('song-list-body');

    if (logContainer) {
        //外部のJSONファイルを読みに行く
        fetch('./assets/data/list.json')
            .then(response => response.json())
            .then(data => {

            const songs = data.songs;

            songs.sort((a,b) => {
                return (b.tieup !== "") - (a.tieup !== "");
            });

                songs.forEach(item => {

                    // divにデータを放り込む
                    const row = document.createElement('tr');

                    // データの送り先は <div class="content-table">
                    row.innerHTML = `
                        <td class="col-title">${item.title}</td>
                        <td class="col-up">${item.tieup}</td>
                        <td class="col-produce">${item.produce}</td>
                    `;
                    logContainer.appendChild(row);
                });
            })
            .catch(error => console.log("ログが読めませんでした", error));
    }
});