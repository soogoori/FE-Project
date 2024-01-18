const imageList = document.querySelector(".img-container");
let pageToFetch = 1;
async function fetchImages(pageNum){
    try {
        const response = await fetch('https://picsum.photos/v2/list?page='+pageNum+'&limit=10');
        if (!response.ok) {
            throw new Error("네트워크 응답에 문제가 있습니다.");
        }

        const datas = await response.json();
        console.log(datas);
        makeImageList(datas);
    } catch (error){
        console.error('데이터를 가져오는데 문제가 발생했습니다 :', error);
    }
}

function makeImageList(datas){
    datas.forEach((item)=>{
        imageList.innerHTML += "<div class='img-wrap'><img src="+ item.download_url +" alt=''></div>";
    })
}

window.addEventListener('scroll', () => {
    // 스크롤이 상단으로부터 얼마나 이동했는지 알아야함. (viewport 높이 + scroll된 길이)
    // 화면에 로딩된 페이지의 전체 높이 === 뷰포트 높이 + 스크롤된 길이 + 5~10px(매끄럽게 하기 위해서)

    if(window.innerHeight + document.documentElement.scrollTop + 10 >=
        document.documentElement.offsetHeight){
        fetchImages(pageToFetch++);
    }
});
fetchImages();