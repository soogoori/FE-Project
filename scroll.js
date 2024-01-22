const imageList = document.querySelector(".img-container");
const showMoreBtn = document.querySelector(".btn-showmore");
let pageToFetch = 1;

// throttling
const throttling = (callback, delay) => {
    let timer = null;
    return () => {
        console.log(timer);

        if (timer === null) {
            timer = setTimeout(() => {
                callback();
                timer = null;
            }, delay);
        }
    };
};

// 이미지 불러오기
async function fetchImages(pageNum){
    try {
        const response = await fetch('https://picsum.photos/v2/list?page='+pageNum+'&limit=6');
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
    for (let i = 0; i < datas.length; i+=3) {
        imageList.innerHTML += "<div class='img-wrap'>" +
            "<img src="+ datas[i].download_url +" alt=''>" +
            "<img src="+ datas[i+1].download_url +" alt=''>" +
            "<img src="+ datas[i+2].download_url +" alt=''></div>";
    }
}

function showMoreImgs() {
    window.addEventListener('scroll', throttling(infinityScroll, 2000));

    let showMore = document.querySelectorAll(".img-wrap");

    for (var i = 2; i < showMore.length; i++) {
        console.log("length: " + showMore.length);
        showMore[i].style.display="flex";
    }
}
showMoreBtn.addEventListener('click', showMoreImgs);

// 무한 스크롤
function infinityScroll() {

    // 스크롤이 상단으로부터 얼마나 이동했는지 알아야함. (viewport 높이 + scroll된 길이)
    // 화면에 로딩된 페이지의 전체 높이 === 뷰포트 높이 + 스크롤된 길이 + 5~10px(매끄럽게 하기 위해서)

    if(window.innerHeight + document.documentElement.scrollTop + 10 >=
        document.documentElement.offsetHeight && pageToFetch<10){
        console.log(pageToFetch);
        fetchImages(pageToFetch++);
    }
}
fetchImages();

// 상단으로 올라가는 버튼
const goUpBtn = document.querySelector("#arrow-hover");

goUpBtn.addEventListener("click",()=>{

    window.scrollTo({ top: 0, behavior: 'smooth' });
})

