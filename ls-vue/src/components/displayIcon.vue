<template>
    <div class="col-auto list-group" id="display-icon" role="tablist">
        <a v-show="category.all" class="list-group-item list-group-item-action rounded-0" id="list-all-list" data-toggle="list" href="#list-all" role="tab" aria-controls="all">
            <img src="/static/img/all.png" alt="all" data-toggle="tooltip" title="全部">
        </a>
        <a v-show="category.airport" class="list-group-item list-group-item-action rounded-0" id="list-airport-list" data-toggle="list" href="#list-airport" role="tab" aria-controls="airport">
            <img src="/static/img/airport.png" alt="airport" data-toggle="tooltip" title="飞机">
        </a>
        <a v-show="category.quadcopter" class="list-group-item list-group-item-action " id="list-quadcopter-list" data-toggle="list" href="#list-quadcopter" role="tab" aria-controls="quadcopter">
            <img src="/static/img/quadcopter.png" alt="quadcopter" data-toggle="tooltip" title="无人机">
        </a>
        <a v-show="category.oilTanker" class="list-group-item list-group-item-action" id="list-oil-tanker-list" data-toggle="list" href="#list-oil-tanker" role="tab" aria-controls="oil-tanker">
            <img src="/static/img/oil-tanker.png" alt="oil-tanker" data-toggle="tooltip" title="加油车">
        </a>
        <a v-show="category.fireTruck" class="list-group-item list-group-item-action" id="list-fire-truck-list" data-toggle="list" href="#list-fire-truck" role="tab" aria-controls="fire-truck">
            <img src="/static/img/fire-truck.png" alt="fire-truck" data-toggle="tooltip" title="消防车">
        </a>
        <a v-show="category.crane" class="list-group-item list-group-item-action" id="list-crane-list" data-toggle="list" href="#list-crane" role="tab" aria-controls="crane">
            <img src="/static/img/crane.png" alt="crane" data-toggle="tooltip" title="工程车">
        </a>
        <a v-show="category.trailer" class="list-group-item list-group-item-action" id="list-trailer-list" data-toggle="list" href="#list-trailer" role="tab" aria-controls="trailer">
            <img src="/static/img/trailer.png" alt="trailer" data-toggle="tooltip" title="拖车">
        </a>
        <a v-show="category.truck" class="list-group-item list-group-item-action" id="list-truck-list" data-toggle="list" href="#list-truck" role="tab" aria-controls="truck">
            <img src="/static/img/truck.png" alt="truck" data-toggle="tooltip" title="货车">
        </a>
        <a v-show="category.forkLift" class="list-group-item list-group-item-action" id="list-fork-lift-list" data-toggle="list" href="#list-fork-lift" role="tab" aria-controls="fork-lift">
            <img src="/static/img/fork-lift.png" alt="fork-lift" data-toggle="tooltip" title="叉车">
        </a>
        <a v-show="category.bus" class="list-group-item list-group-item-action" id="list-bus-list" data-toggle="list" href="#list-bus" role="tab" aria-controls="bus">
            <img src="/static/img/bus.png" alt="bus" data-toggle="tooltip" title="大巴">
        </a>
        <a v-show="category.ferry" class="list-group-item list-group-item-action" id="list-ferry-list" data-toggle="list" href="#list-ferry" role="tab" aria-controls="ferry">
            <img src="/static/img/ferry.png" alt="ferry" data-toggle="tooltip" title="摆渡车">
        </a>
        <a v-show="category.motorcycle" class="list-group-item list-group-item-action" id="list-motorcycle-list" data-toggle="list" href="#list-motorcycle" role="tab" aria-controls="motorcycle">
            <img src="/static/img/motorcycle.png" alt="motorcycle" data-toggle="tooltip" title="电动车">
        </a>
        <a v-show="category.bicycle" class="list-group-item list-group-item-action" id="list-bicycle-list" data-toggle="list" href="#list-bicycle" role="tab" aria-controls="bicycle">
            <img src="/static/img/bicycle.png" alt="bicycle" data-toggle="tooltip" title="自行车">
        </a>
        <a v-show="category.luggageTrolley" class="list-group-item list-group-item-action rounded-0" id="list-luggage-trolley-list" data-toggle="list" href="#list-luggage-trolley" role="tab" aria-controls="luggage-trolley">
            <img src="/static/img/luggage-trolley.png" alt="luggage-trolley" data-toggle="tooltip" title="手推车">
        </a>
    </div>
</template>

<script>
import displayCount from './displayCount'
export default {
  name: 'displayIcon',
  data() {
    return {
      category: {
        all: true,
        airport: true,
        quadcopter: true,
        oilTanker: true,
        fireTruck: true,
        crane: true,
        trailer: true,
        truck: true,
        forkLift: true,
        bus: true,
        ferry: true,
        motorcycle: true,
        bicycle: true,
        luggageTrolley: true
      },
      count: {
        all: 0,
        airport: 0,
        quadcopter: 0,
        oilTanker: 0,
        fireTruck: 0,
        crane: 0,
        trailer: 0,
        truck: 0,
        forkLift: 0,
        bus: 0,
        ferry: 0,
        motorcycle: 0,
        bicycle: 0,
        luggageTrolley: 0
      }
    }
  },
  components: {
    'display-count': displayCount
  },
  computed: {}
}
</script>

<style scoped>
img {
  max-width: 60%;
}
a {
  padding-left: 0%;
  padding-right: 0%;
  padding-top: 2%;
  padding-bottom: 2%;
  margin-bottom: 0%;
}
#display-icon {
  padding-right: 0%;
}
</style>