const $=document.querySelector.bind(document)
    const $$=document.querySelectorAll.bind(document)
    const PLAYER_STORAGE_KEY='DUCVO_PLAYER'
    const heading= $('header h2')
    const cdThumb=$('.cd-thumb')
    const audio=$('#audio')
    const cd= $('.cd')
    const playBtn = $('.btn-toggle-play')
    const player =$('.player')
    const progress= $('.progress')
   const btnNext= $('.btn-next')
   const btnPrev= $('.btn-prev')
   const btnRandom=$('.btn-random')
   const btnRepeat=$('.btn-repeat')
   const playlist=$('.playlist')
   const song=$('.song')
  const app={
    isPlaying: false,
    isRandom:false,     
    isRepeat:false,                                                                                                                                      
    currentIndex: 0,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY))||{},
    songs: [

      {
         name: 'Yêu đương khó quá',
         singer:'Erik',
         path: './assets/YeuDuongKhoQuaThiChayVeKhocVoiAnh-ERIK-7128950.mp3',
         image: './assets/154074.jpg'
    },
    {
         name: 'Chán gái 707',
         singer:'Low G',
         path: './assets/ChanGai707-LowG-6737474.mp3',
         image: './assets/Chán gái.jpg'
    },
    {
         name: 'Dont waste my time',
         singer:'16typh',
         path: './assets/DontWasteMyTime-LilWuyn16Typh-6580365.mp3',
         image: './assets/dont waste.jpg'
    },
    {
         name: 'Yêu đương khó quá',
         singer:'Erik',
         path: './assets/YeuDuongKhoQuaThiChayVeKhocVoiAnh-ERIK-7128950.mp3',
         image: './assets/154074.jpg'
    },
    {
         name: 'Chán gái 707',
         singer:'Low G',
         path: './assets/ChanGai707-LowG-6737474.mp3',
         image: './assets/Chán gái.jpg'
    },
    {
         name: 'Dont waste my time',
         singer:'16typh',
         path: './assets/DontWasteMyTime-LilWuyn16Typh-6580365.mp3',
         image: './assets/dont waste.jpg'
    },
    {
         name: 'Yêu đương khó quá',
         singer:'Erik',
         path: './assets/YeuDuongKhoQuaThiChayVeKhocVoiAnh-ERIK-7128950.mp3',
         image: './assets/154074.jpg'
    },
    {
         name: 'Chán gái 707',
         singer:'Low G',
         path: './assets/ChanGai707-LowG-6737474.mp3',
         image: './assets/Chán gái.jpg'
    },
    {
         name: 'Dont waste my time',
         singer:'16typh',
         path: './assets/DontWasteMyTime-LilWuyn16Typh-6580365.mp3',
         image: './assets/dont waste.jpg'
    },
  ],
   setConfig: function(key,value) {
this.config[key]=value;
localStorage.setItem(PLAYER_STORAGE_KEY,JSON.stringify(this.config));
   } , 
  render: function(){
     const htmls= this.songs.map((song, index) =>{
       return `
       <div class="song ${index ===this.currentIndex?'active':''}" data-index="${index }">
      <div class="thumb" style="background-image: url('${song.image}')"></div>
      
      <div class="body">
        <h3 class="title">${song.name}</h3>
        <p class="author">${song.singer}</p>
      </div>
      <div class="option">
        <i class="fas fa-ellipsis-h"></i>
      </div>
    </div>

    `
     })
     playlist.innerHTML =htmls.join('');
     },
     defineProperties: function(){
       Object.defineProperty(this,'currentSong', {
         get: function(){
           return this.songs[this.currentIndex];
         }
       })
     },

     handleEvents: function(){
       const _this=this
       //Xử lý CD quay/dừng
       const cdThumbanimate=cdThumb.animate([
         { transform: 'rotate(360deg)'}
       ],{duration: 10000,//10s
      interaction:Infinity 
      }
       )
       cdThumbanimate.pause()
       //Lắng nghe sự kiện click play
       playBtn.onclick= function(){
         if(_this.isPlaying){
          
           audio.pause()
          
         }else{
          
         audio.play()
          
         }
         audio.ontimeupdate= function(){
           if(audio.duration){
             const progressPercent=Math.floor(audio.currentTime/audio.duration*100)
             progress.value=progressPercent
           }
           //Xử lý khi tua song 
           progress.onchange= function(e){
             const seekTime=e.target.value*(audio.duration /100)
             audio.currentTime= seekTime
           }
         }
         //Xử lý khi pause
         audio.onpause= function(){
          _this.isPlaying=false;
          cdThumbanimate.pause()
          player.classList.remove("playing")
         }
         //Xử lý khi play
         audio.onplay=function(){
          _this.isPlaying=true;
          cdThumbanimate.play()
          player.classList.add('playing')
         }
         //Khi next song
         btnNext.onclick=function(){
           if(_this.isRandom){
             _this.playRandomSong()
           }else{
            _this.nextSong()
           }
         
           audio.play()
           _this.render()
           _this.scrollToActiveSong()
         }
         //Khi prev song
         btnPrev.onclick=function(){
          if(_this.isRandom){
             _this.playRandomSong()
           }else{
            _this.prevSong()
           }
         
           audio.play()
           _this.render()
           _this.scrollToActiveSong()
         }
         //Khi bật tắt ramdom song
         btnRandom.onclick=function(){
           _this.isRandom=!_this.isRandom        
           _this.setConfig('isRandom',_this.isRandom)                                                                                                                                   
           btnRandom.classList.toggle("active",_this.isRandom)
           
           
         }
         //Xử lý next song khi audio ended
         audio.onended=function(){
         
           if(_this.isRandom){
             _this.playRandomSong()
           }else{
            _this.nextSong()
           }
           if(_this.isRepeat){
             audio.play()
           }else{
             _this.nextSong()
           }
         
           audio.play()
         
         }
         //Xử lý repeat btn
         btnRepeat.onclick=function(){
           _this.isRepeat=!_this.isRepeat
           _this.setConfig('isRepeat',_this.isRepeat)  
           btnRepeat.classList.toggle("active",_this.isRepeat)
           
         }
         //Lắng nghe khi nhấn vào playlist 
         playlist.onclick=function(e){
           const songNote=e.target.closest('.song:not(.active)')
           if(e.target.closest('.song:not(.active)')||e.target.closest('.option')){
              _this.currentIndex=Number(songNote.dataset.index) 
              _this.loadCurrentSong()
              _this.render()
              audio.play()
            
           }
         }
       }

      //Lắng nghe sự kiện scroll
       const cdWidth=cd.offsetWidth
       document.onscroll=function(){
       const scrollTop= document.documentElement.scrollTop|| window.scrollY 
       const newCdWidth= cdWidth - scrollTop
       
       cd.style.width=newCdWidth   +'px'
       cd.style.opacity=newCdWidth/cdWidth
       }
     },
   
    loadCurrentSong: function(){
    
    heading.textContent = this.currentSong.name
    cdThumb.style.backgroundImage=`url('${this.currentSong.image}')`
    audio.src=this.currentSong.path
    },
    loadConfig: function(){
      this.isRandom=this.config.isRandom
      this.isRepeat=this.config.isRepeat
    },
    nextSong: function(){
      this.currentIndex++
      if(this.currentIndex>= this.songs.length -1){
        this.currentIndex=0
    }
    this.loadCurrentSong()
   },
   prevSong: function(){
     this.currentIndex--
     if(this.currentIndex<= 0){
       this.currentIndex=this.songs.length-1
     }
     this.loadCurrentSong()
   },
  playRandomSong:function(){
    let newIndex
    do{
       newIndex=Math.floor(Math.random() *this.songs.length);
    }while(newIndex ==this.currentIndex)
   this.currentIndex=newIndex
   this.loadCurrentSong()
  },
  scrollToActiveSong:function(){
    setTimeout(()=>{
      $('.song.active').scrollIntoView({
        behavior: 'smooth',
        block:'nearest',
      })
    },300)
  },
  playClickSong: function(){
      console.log(song)
  },

     start: function(){
       //Gán cấu hình vào app
       this.loadConfig()
       //Định nghĩa các thuộc tính cho Object
       this.defineProperties()
      
       //Lắng nghe/xử lý các sự kiện
       this.handleEvents()
       
       //Tải thông tin bài hát đầu tiên vào UI
       this.loadCurrentSong()
        //Render playlist
        this.render()
        btnRandom.classList.toggle("active",this.isRandom)
        btnRandom.classList.toggle("active",this.isRepeat)
     }
  }
  app.start()