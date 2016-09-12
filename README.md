# Relational Timeline

In a typical timeline, events are listed along a single dimension, time, which makes comparing different things and finding relationships within the data difficult. Relational Timeline solves this problem by letting users interact with the timeline to stack different timelines along the vertical dimension.

![](https://andrewzkwong.github.io/img/relational_timeline_example.PNG)

## Demo
A running demo of Relational Timeline can be found [here](https://andrewzkwong.github.io/demos/RelationalTimeline/index.html).

In the demo, you'll find a timline of events that occur in a story where a group of people start a business together. You can try applying one of the preset timelines in the middle of the sidebar, where you'll be able to see timelines of characters in different locations or timelines of characters' interactions with other characters. You can also try making your own set of timelines by using the keywords on the top of the sidebar and putting the keywords as timelines or as y-axis elements.

## Installation
Clone the repository, then run:

```
$npm install
$npm start
```

## Modifying Events
You can modify the list of events on the app by modifying `/src/events.json`.

The object produced by `/src/events.json` should be in the form of a single object with three properties: `events`, `keywords`, and `presets`. `events` should be an array of `event` objects, which have the properties: `time`, which is a string of the date in the form YYYY-MM-DD, `keywords`, which is an array that contains the keywords associated with the event, and `desc`, which is a String with a description of the event.

## To Do
- Create an API to let users modify the app.
- Further documentation
- Polish: transitions, zoom in/out, dragging capabilities