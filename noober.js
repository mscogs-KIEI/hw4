function renderRide (leg){
let outputElement = document.querySelector('.rides')
let passengerNumberofPassengers = leg.numberOfPassengers
let passengerName = `${leg.passengerDetails.first} ${leg.passengerDetails.last}`
let passengerPhone = leg.passengerDetails.phoneNumber
let passengerpickupAddressLine1 = leg.pickupLocation.address
let passengerpickupAddressLine2 = `${leg.pickupLocation.city}, ${leg.pickupLocation.state} ${leg.pickupLocation.zip}` 
let passengerdropoffAddressLine1 = leg.dropoffLocation.address
let passengerdropoffAddressLine2 = `${leg.pickupLocation.city}, ${leg.pickupLocation.state} ${leg.pickupLocation.zip}` 

outputElement.insertAdjacentHTML('beforeEnd', `
<div class="border-4 border-gray-900 p-4 my-4 text-left">
<div class="flex">
<div class="w-1/2">
 <h2 class="text-2xl py-1">${passengerName}</h2>
 <p class="font-bold text-gray-600">${passengerPhone}</p>
</div>
<div class="w-1/2 text-right">
 <span class="rounded-xl bg-gray-600 text-white p-2">
 ${passengerNumberofPassengers}
 </span>
</div>
</div>
<div class="mt-4 flex">
<div class="w-1/2">
 <div class="text-sm font-bold text-gray-600">PICKUP</div>
 <p>${passengerpickupAddressLine1}</p>
 <p>${passengerpickupAddressLine2}</p>
</div>
<div class="w-1/2">
 <div class="text-sm font-bold text-gray-600">DROPOFF</div>
 <p>${passengerdropoffAddressLine1}</p>
 <p>${passengerdropoffAddressLine2}</p>
</div>
</div>
</div>`
)
}
async function pageLoaded() {
  let response = await fetch('https://kiei451.com/api/rides.json')
  let json = await response.json()

  console.dir(json)

  for (let i = 0; i < json.length; i++) {
    let ride = json[i]
    console.log(ride)
    if(ride.length > 1) {
      levelOfService = 'Noober Pool'
    } else if (ride[0].purpleRequested) {
      levelOfService = 'Noober Purple'
    } else if (ride[0].numberOfPassengers > 3) {
      levelOfService = 'Noober XL'
    } else {
      levelOfService = 'Noober X'
    }
    let outputElement = document.querySelector('.rides')
    outputElement.insertAdjacentHTML('beforeEnd', `<h1 class="inline-block mt-8 px-4 py-2 rounded-xl text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
    <i class="fas fa-car-side"></i>
    <span>${levelOfService}</span>
   </h1>`)

   for (let l = 0; l < ride.length; l++) {
    let leg = ride[l]
    renderRide(leg)
   }
}
}
window.addEventListener('DOMContentLoaded', pageLoaded)
