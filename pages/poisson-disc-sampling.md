# Poisson Disc Sampling

When making games it's often useful to be able to generate random points on a plane.

One particularly useful technique for this is Poisson Disc Sampling.

{{div class="divider"}}

## <a id="1-defining-a-radius" href="#1-defining-a-radius">1 Defining a radius</a>

{{canvas id="step1"}}

The first step is to choose a minimum distance (r), the maximum distance is generally set to 2r.
New points are generated using the annulus created around an "active point".
Anywhere within the highlighted area is where a new point may be generated.

```c
const int RADIUS = 10;
```

1. Any new point cannot be generated at a distance less than range _r_ of any other point.
2. Any new point cannot be generated at a distance greater than _2r_.

{{div class="divider"}}

## <a id="2-generating-new-points" href="#2-generating-new-points">2 Generating new points</a>

Points can be generated within the annulus of other points,
so long as they don't break the rules listed above.
If no new point satisfying these rules can be generated within a certain amount of samples,
then this point is no longer considered active.

Note that in this example only the centre point is added to the active list,
but in the full algorithm each new point would be added and have other points generated from thm.

Depending on the amount of samples you define,
there may be space for another point in the annulus but the point can become inactive.

## <a id="3-generating-more-points" href="#3-generating-more-points">3 Generating more points</a>

Once a point has been generated, it is considered active until the algorithm selects it and
subsequentially fails to spawn any new points within it's annulus.

Use the demo to step through what this may look like.
The current active point is highlighted by its annulus and the index is bold in the active list.

## <a id="4-a-full-example" href="#4-a-full-example">4 A full example</a>

This simplest way to implement Poisson Disc Sampling is to check a new point against all other
points before confirming it. This works, but is very slow.

## <a id="5-a-better-algorithm" href="#5-a-better-algorithm">5 A better algorithm</a>

A far better algorithm is outlined in [Robert Bridson's paper](https://www.cct.lsu.edu/~fharhad/ganbatte/siggraph2007/CD2/content/sketches/0250.pdf)
in which a grid is used to only check nearby points.

When any new point is created, it (or it's index, depending on your implementation) is also
inserted into this background grid.

The size of the grid cells is calculated as such that there cannot be more than one point per cell.

Then, when a new point is generated, the algorithm only needs to check the surrounding 5x5 (for 2D)
grid, rather than every point.


{{script src="poisson-disc-sampling.js"}}
