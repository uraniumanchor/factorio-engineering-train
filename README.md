Ever wanted an engineering train but didn't want to have to build it all by hand, get the numbers and stacks right, only to discover you miswired or miscounted something and have to do the whole thing again?

Well, now you don't have to. This very unpolished React-based app with do it for you! Tell it what you want and it will give you the string for a blueprint book.

* specify fluids to deliver (gotta have those flamethrower turrets!)
* specify how many stacks of solids to deliver
* optionally specify a filler (gotta deliver artillery shells, too!)
* optionally specify a fuel to keep the train stocked up
* specify single-head or dual-head train
* creates both a provider station and the requester stations
* requester station uses signals to precisely(ish) control exactly what gets delivered (once built, control what each requester station actually wants by setting the signals in the constant combinator)
* requester station gets a roboport with a desired minimum of 50 construction/logistic robots, for maximum gray goo potential
* saves the state in the anchor hash, so you can bookmark and share your setup

caveats:

* requester station may get slightly more than asked for due to the way the filter signals work
* requester stations will by default request nothing, but I might make this configurable, or even make a book with multiple requester station setups
* logistic deliveries at each requester station will need to be bootstrapped by manually placing at least 1 logistic bot in the roboport area
* interface can get a little unresponsive when trying to do rapid tweaks to your settings
* not terribly pretty and might be full of bugs! I built this in maybe 8 hours, but the result seemed to work pretty well in a test map!
* only works with Vanilla for now

Try it out and let me know what you think!

https://uraniumanchor.github.io/factorio-engineering-train/

https://github.com/uraniumanchor/factorio-engineering-train/

[Stations](https://i.imgur.com/pajDKsp.jpg)

[Cargo Wagon Filter](https://i.imgur.com/9V9h8nx.png)

[Receiver Pump](https://i.imgur.com/PreFP6d.png)
