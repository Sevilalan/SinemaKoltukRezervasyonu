const container=document.querySelector('.container');
const count=document.getElementById('count');
const amount=document.getElementById('amount');
const select= document.getElementById('movie');/*film türlerini burdana aldık */
const seats=document.querySelectorAll('.seat:not(.reserved)');

getFromLocalStorage();
calculateTotal();

container.addEventListener('click',function(e) {
   /* console.log(e.target);/*elemana tıklayıp bilgisi gelsin istiyorsak 'target 'kullanıyoruz 
    ancak burada tıkladığımız her alanın bilgisi gelir biz sadece 'seat' olanlar gelsin
    istiyorsak if ile koşul koymalıyız.*/

    if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved')){/*içerisinde seat olan class'ları geririr */
        e.target.classList.toggle('selected');/* burada tıklanan elemanı 'seçili' yani selected yapar sarı renge ayarlamıştık ona boyar */

        calculateTotal();
    
    }

});

select.addEventListener('change', function(e){
    
    calculateTotal();

});


function calculateTotal(){
   
    const selectedSeats =container.querySelectorAll('.seat.selected');
    
    const selectedSeatArr=[];
    const seatsArr=[];

    selectedSeats.forEach(function(seat){
        selectedSeatArr.push(seat);

    });

    seats.forEach(function(seat){

        seatsArr.push(seat);
    });

    let SelectedSeatIndexs=selectedSeatArr.map(function(seat){
        return seatsArr.indexOf(seat);

    });

       

    let selectedSeatCount =selectedSeats.length;
    let  price=select.value; /*burada hangi film ise fiyatları geliyor geliyor */
    count.innerText=selectedSeatCount;/*burada count (kaç adet koltuk olduğu sayılır.)*/
    amount.innerText=selectedSeatCount*price; /*burada kaç koltuk seçilmiş ise ve hangi film seçilmiş ise ona göre toplam fiyat grliyor */

    saveToLocalStorage(SelectedSeatIndexs);
}

function getFromLocalStorage(){
    const selectedSeats=JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats !=null && selectedSeats.length>0){
        seats.forEach(function(seat,index){
            if(selectedSeats.indexOf(index)>-1){
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex=localStorage.getItem('SelectedMovieIndex');

    if(selectedMovieIndex != null){
        select.selectedIndex=selectedMovieIndex;
    }

}

function saveToLocalStorage(index){
    localStorage.setItem('selectedSeats', JSON.stringify(index));
    localStorage.setItem('SelectedMovieIndex', select.selectedIndex);
}