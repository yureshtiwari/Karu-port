// Shared nav active highlight + scroll reveal using IntersectionObserver
(function(){
  // Highlight nav link based on pathname
  function setActiveNav(){
    var links=document.querySelectorAll('.nav-link');
    links.forEach(function(a){
      a.classList.remove('active');
      var href=a.getAttribute('href');
      try{
        var p = location.pathname.split('/').pop();
        if(!p) p='index.html';
        if(href===p || (href==='index.html' && p==='index.html')){
          a.classList.add('active');
        }
      }catch(e){/*noop*/}
    });
  }
  setActiveNav();

  // Smooth scroll for anchor links
  document.addEventListener('click',function(e){
    var a=e.target.closest('a');
    if(!a) return;
    var href=a.getAttribute('href');
    if(!href) return;
    
    // Internal anchor link on same page
    if(href.startsWith('#')){
      e.preventDefault();
      var target=document.querySelector(href);
      if(target){
        target.scrollIntoView({behavior:'smooth',block:'start'});
      }
      return;
    }
    
    if(href.indexOf('http')===0) return; // external
    if(href.indexOf('mailto:')===0) return; // mailto links

    // Skip page transition for footer links — navigate immediately
    if(a.closest('.site-footer')){
      return;
    }

    // Page transition on internal links
    e.preventDefault();
    document.body.classList.add('page-exit');
    setTimeout(function(){ location.href=href; }, 260);
  });

  // Intersection Observer for reveal elements and exp cards
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  },{threshold:0.12});

  document.querySelectorAll('[data-animate]').forEach(function(el){ io.observe(el); });
  document.querySelectorAll('.exp-card').forEach(function(el){ io.observe(el); });
  document.querySelectorAll('.featured-item').forEach(function(el){ io.observe(el); });
  document.querySelectorAll('.summary-card').forEach(function(el){ io.observe(el); });

  // Add scroll-based direction animations to featured items
  document.querySelectorAll('.featured-item').forEach(function(el,idx){
    if(idx%2===0){
      el.setAttribute('data-direction','left');
    }else{
      el.setAttribute('data-direction','right');
    }
  });

  // Back to top button
  var backToTop=document.getElementById('backToTop');
  if(backToTop){
    var scrollThreshold=400;
    var ticking=false;
    function updateBackToTop(){
      if(window.scrollY>scrollThreshold){
        backToTop.classList.add('is-visible');
      }else{
        backToTop.classList.remove('is-visible');
      }
      ticking=false;
    }
    window.addEventListener('scroll',function(){
      if(!ticking){
        requestAnimationFrame(updateBackToTop);
        ticking=true;
      }
    },{passive:true});
    backToTop.addEventListener('click',function(){
      window.scrollTo({top:0,behavior:'smooth'});
    });
  }

})();
