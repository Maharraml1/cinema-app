const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)')

getFromLocalStorage();
calculateTotalPrice();


container.addEventListener('click', function(e){
  if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved')){
    e.target.classList.toggle('selected');
    calculateTotalPrice()
  }
})

select.addEventListener('change', calculateTotalPrice)

function calculateTotalPrice() {
  let selectedSeats = container.querySelectorAll('.seat.selected');

  const selectedSeatArr = [...selectedSeats];
  const seatsArr = [...seats];

  let selectedSeatsIndex = selectedSeatArr.map(function(e){
    return seatsArr.indexOf(e)
  })

  console.log(selectedSeatsIndex)

  let selectedSeatCount = selectedSeats.length;
  count.innerText = selectedSeatCount;
  amount.innerText = selectedSeatCount * select.value;
  saveToLocalStorage(selectedSeatsIndex);
}

function getFromLocalStorage(){
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  
  if(selectedSeats != null && selectedSeats.length > 0){
    seats.forEach(function(seat, index){
      if(selectedSeats.indexOf(index) > -1){
        seat.classList.add('selected')
      }
    })
  }
  
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')

  if(selectedMovieIndex != null){
    select.selectedIndex = selectedMovieIndex
  }
  
}

function saveToLocalStorage(indexs) {
  localStorage.setItem('selectedSeats', JSON.stringify(indexs));
  localStorage.setItem('selectedMovieIndex', select.selectedIndex);
}