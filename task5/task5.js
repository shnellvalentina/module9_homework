const button = document.querySelector('button');
const resultNode = document.querySelector('.result')

const localData = localStorage.getItem('data');
if (localData) {
    loadImage(JSON.parse(localData))
}

button.addEventListener('click', async () => {
    const page = +document.querySelector('.input1').value;
    const limit = +document.querySelector('.input2').value;

    
    if ((page >= 1 && page <= 10) && (limit >= 1 && limit <= 10)) {
        fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
            .then((response) => {
                result = response.json();
                console.log(result)
                return result;
            })
            .then((data) => {
                console.log(data);
                localStorage.setItem('data', JSON.stringify(data));
                loadImage(data);
                return data;
            })
            
            .catch(() => {console.log('error') });
    }
    else if ((page < 1 || page > 10) && (limit >= 1 && limit <= 10)) {
        resultNode.innerHTML = `<p>
        Номер страницы вне диапазона от 1 до 10
        </p>`;
    }
    else if ((page >= 1 && page <= 10) && (limit < 1 || limit > 10)) {
        resultNode.innerHTML = `<p>
        Лимит вне диапазона от 1 до 10
        </p>`;
    }
    else{
        resultNode.innerHTML = `<p>
        Номер страницы и лимит вне диапазона от 1 до 10
        </p>`;
    }
});

function loadImage(data) {
    for (item of data) {
        let img = document.createElement('IMG');
        img.setAttribute('src', item.download_url);
        img.setAttribute('width', '400');
        resultNode.append(img);
    }
}
