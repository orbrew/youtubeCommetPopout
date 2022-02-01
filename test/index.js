Draggable.create('#draw');
Draggable.create('.scene', {
  onPress: function(event) {
    event.stopPropagation();
  },
  onDragEnd: function() {
    const table = document.querySelector('.Table');
    const card = document.querySelector('.scene');
    table.prepend(document.querySelector('.scene'));
    let dropArea = null;
    document.querySelectorAll('.Area').forEach( area => {
      if (Draggable.hitTest(card, area, '51%')) {
        dropArea = area;
        dropArea.prepend(document.querySelector('.scene'));
        gsap.to(card, { x: 0, y: 0, duration: 0.5 });
      }
    });
    !dropArea && table.prepend(document.querySelector('.scene'));
  }
});
