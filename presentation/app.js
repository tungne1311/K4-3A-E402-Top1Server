'use strict';
const notes = [
  [
    "0:00?0:20 ? L? do ch?n ?? t?i",
    "“Thưa các anh chị, khi lời đọc của một bài giảng đã được chốt, liệu công việc khó nhất đã xong chưa?\n\nTrong chương trình AI thực chiến, nhiều khái niệm khá trừu tượng. Để người học hiểu, nội dung đúng thôi chưa đủ; hình minh họa còn phải truyền đạt đúng ý."
  ],
  [
    "0:20?0:45 ? N?i ?au Lab Coach",
    "Hãy hình dung anh chị Lab Coach đã chuẩn bị xong lời đọc, nhưng vẫn phải trả lời: đoạn này vẽ gì, chữ nào cần hiện, và hình xuất hiện lúc nào?\n\nKhi bàn giao, điều anh chị hình dung chưa chắc là điều người dựng hiểu. Nếu đến lúc có bản dựng mới phát hiện lệch ý, hai bên lại phải trao đổi và sửa.\n\nNhóm em chọn đề tài này vì điểm nghẽn không chỉ là thiếu ý tưởng hình ảnh, mà là thiếu một bản kế hoạch để hai bên thống nhất trước khi dựng.”"
  ],
  [
    "0:45?1:15 ? Gi?i ph?p ?? xu?t",
    "“Giải pháp của nhóm em là StoryboardAI — hỗ trợ chuyển lời đọc đã chốt thành kế hoạch hình cho từng cảnh.\n\nAI đề xuất ý cần truyền đạt, cách minh họa, chữ trên màn hình và điểm xuất hiện theo lời đọc. Thay vì bắt đầu từ trang trắng, Lab Coach có bản nháp để xem và biên tập.\n\nVí dụ, với câu ‘AI trả lời nghe hợp lý nhưng vẫn có thể sai’, điều cần thể hiện không phải một robot thật đẹp, mà là ‘hợp lý chưa chắc đúng’. Lời đọc được đặt cạnh kế hoạch hình để anh chị đối chiếu; những nội dung rủi ro được AI đánh dấu để xem kỹ."
  ],
  [
    "1:15?1:40 ? Gi? tr? & ki?m so?t",
    "Anh chị có thể sửa riêng một cảnh, xem trước–sau và lưu lý do chỉnh tay mà không thay đổi các cảnh còn lại. Khi tất cả cảnh được duyệt và đạt kiểm tra cấu trúc, mới xuất kế hoạch để bàn giao.\n\nGiá trị nhóm em hướng tới là: bớt công nghĩ từ đầu, bớt hiểu lệch khi bàn giao và dễ kiểm soát việc chỉnh sửa. AI hỗ trợ đề xuất, còn Lab Coach giữ quyền quyết định.”"
  ],
  [
    "1:40?2:25 ? So s?nh tr??c / sau",
    "“Điểm khác biệt thể hiện ở ba thay đổi.\n\nTrước đây, nếu chỉ bàn giao lời đọc, người dựng phải tự suy đoán cách thể hiện. Với StoryboardAI, mỗi cảnh có ý đồ hình, chữ và mốc xuất hiện để cùng đối chiếu.\n\nTrước đây, nếu chờ đến bản dựng mới kiểm tra hình, lệch ý có thể được phát hiện muộn. Với StoryboardAI, Lab Coach có thể xem và sửa bản kế hoạch trước khi bắt đầu dựng.\n\nTrước đây, nếu góp ý nằm rải rác trong tin nhắn, khó theo dõi cảnh nào đã đổi. Với StoryboardAI, chỉnh sửa thủ công có lý do, lịch sử trước–sau và trạng thái duyệt lại.\n\nChúng em không chỉ tạo thêm ý tưởng, mà đưa ý tưởng vào một quy trình có thể sửa, duyệt và bàn giao. Hiệu quả thực tế vẫn cần được kiểm chứng cùng các anh chị.”"
  ],
  [
    "2:25?2:50 ? Ch?t v?n ??",
    "“StoryboardAI chưa tự dựng video và không thay thế việc thẩm định kiến thức của Lab Coach.\n\nĐiều nhóm em muốn giải quyết là khoảng cách giữa điều người dạy muốn truyền đạt và điều người dựng thực sự thể hiện.\n\nThay vì chờ dựng xong mới biết hai bên hiểu khác nhau, hãy thống nhất ngay từ bản kế hoạch.\n\nStoryboardAI — thống nhất trước khi dựng. AI hỗ trợ, con người quyết định.\n\nNhóm em mong được các anh chị dùng thử trên một bài giảng thực tế và góp ý.”"
  ]
];
const slides = [...document.querySelectorAll('.slide')];
const $ = id => document.getElementById(id);
let current = 0, remaining = 180000, deadline = 0, timer = null;
function show(index){current=Math.max(0,Math.min(slides.length-1,index));slides.forEach((slide,i)=>{slide.classList.toggle('active',i===current);slide.setAttribute('aria-hidden',String(i!==current));});$('counter').textContent=`0${current+1} / 06`;$('progress').style.width=`${(current+1)/slides.length*100}%`;$('prev').disabled=current===0;$('next').disabled=current===slides.length-1;$('note-time').textContent=notes[current][0];$('note-text').textContent=notes[current][1];history.replaceState(null,'',`#${current+1}`);}
function clock(){if(timer)remaining=Math.max(0,deadline-Date.now());const seconds=Math.ceil(remaining/1000);$('timer').textContent=`${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`;if(!remaining&&timer){clearInterval(timer);timer=null;$('start').textContent='Hết giờ';}}
$('start').onclick=()=>{if(timer){remaining=Math.max(0,deadline-Date.now());clearInterval(timer);timer=null;$('start').textContent='Tiếp tục';}else if(remaining>0){deadline=Date.now()+remaining;timer=setInterval(clock,200);$('start').textContent='Tạm dừng';}clock();};
$('reset').onclick=()=>{clearInterval(timer);timer=null;remaining=180000;$('start').textContent='Bắt đầu';clock();};
$('prev').onclick=()=>show(current-1);$('next').onclick=()=>show(current+1);
$('toggle-notes').onclick=()=>{const visible=$('notes').classList.toggle('visible');$('toggle-notes').setAttribute('aria-expanded',String(visible));};
$('fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{$('fullscreen').textContent='Dùng F11 để phóng to';}};
$('print').onclick=()=>window.print();
document.addEventListener('keydown',event=>{if(event.ctrlKey||event.metaKey||event.altKey||['INPUT','TEXTAREA','SELECT'].includes(event.target.tagName))return;const key=event.key.toLowerCase();if(['arrowright','pagedown','arrowleft','pageup','home','end'].includes(key)){event.preventDefault();if(['arrowright','pagedown'].includes(key))show(current+1);if(['arrowleft','pageup'].includes(key))show(current-1);if(key==='home')show(0);if(key==='end')show(5);}if(key==='n')$('toggle-notes').click();if(key==='f')$('fullscreen').click();});
window.addEventListener('beforeprint',()=>slides.forEach(s=>s.removeAttribute('aria-hidden')));window.addEventListener('afterprint',()=>show(current));
const initial=Number(location.hash.slice(1));show(Number.isInteger(initial)&&initial>=1&&initial<=6?initial-1:0);
