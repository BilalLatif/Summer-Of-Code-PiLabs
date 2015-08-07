(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
 var MyComponent2 = require('./components/MyComponent2');
 React.render(React.createElement(MyComponent2, {name: "Handsome"}), document.getElementById('mount-point'));
},{"./components/MyComponent2":2}],2:[function(require,module,exports){
  var Thumbnail = require('./Thumbnail');
var MyComponent2 = React.createClass({displayName: "MyComponent2",
        render: function(){
          var newarr=this.state.images.map(function(element){
          return React.createElement(Thumbnail, {source: element})
        });
          console.log(newarr);
            return (
              React.createElement("div", null, 
                React.createElement("input", {type: "text", onChange: this.nameChange}), 
                React.createElement("button", {onClick: this.chalBey}, "Submit"), React.createElement("br", null), 
                newarr
              )
            );
        },
        componentDidMount:function(){
            this.getimages();
       },
        getInitialState: function(){
          return {
            name:"John",
            images:[]
          }
        },
        nameChange: function(event){
          this.setState({name:event.target.value})
          //this.state.name = event.target.value;
        },
        chalBey: function(){
          var that=this;
          this.state.images.push(this.state.name);
          console.log(this.state.name);
        $.ajax({
                  url: 'http://datastore.asadmemon.com/bilal008', 
                  type: 'POST', 
                  contentType: 'application/json', 
                  data: JSON.stringify(this.state.images),
              success:function(res){console.log(res);
                  that.getimages();
              }
              });
                  
        },
        getimages: function(){
          var that=this;
            $.get('http://datastore.asadmemon.com/bilal008',function(res){
              if(res.length)
                that.setState({images:res});
              console.log(that.state.images);
            });
        }
    });
module.exports = MyComponent2;
},{"./Thumbnail":3}],3:[function(require,module,exports){
  var Thumbnail=React.createClass({displayName: "Thumbnail",
      render:function(){
        return(
          React.createElement("div", null, React.createElement("img", {src: this.props.source, className: "thumb"}))
          );
      }
    });
  module.exports = Thumbnail;
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwianMvYXBwLmpzIiwianMvY29tcG9uZW50cy9NeUNvbXBvbmVudDIuanMiLCJqcy9jb21wb25lbnRzL1RodW1ibmFpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIgdmFyIE15Q29tcG9uZW50MiA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9NeUNvbXBvbmVudDInKTtcclxuIFJlYWN0LnJlbmRlcihSZWFjdC5jcmVhdGVFbGVtZW50KE15Q29tcG9uZW50Miwge25hbWU6IFwiSGFuZHNvbWVcIn0pLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW91bnQtcG9pbnQnKSk7IiwiICB2YXIgVGh1bWJuYWlsID0gcmVxdWlyZSgnLi9UaHVtYm5haWwnKTtcclxudmFyIE15Q29tcG9uZW50MiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJNeUNvbXBvbmVudDJcIixcclxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICB2YXIgbmV3YXJyPXRoaXMuc3RhdGUuaW1hZ2VzLm1hcChmdW5jdGlvbihlbGVtZW50KXtcclxuICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFRodW1ibmFpbCwge3NvdXJjZTogZWxlbWVudH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhuZXdhcnIpO1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwge3R5cGU6IFwidGV4dFwiLCBvbkNoYW5nZTogdGhpcy5uYW1lQ2hhbmdlfSksIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7b25DbGljazogdGhpcy5jaGFsQmV5fSwgXCJTdWJtaXRcIiksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJiclwiLCBudWxsKSwgXHJcbiAgICAgICAgICAgICAgICBuZXdhcnJcclxuICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wb25lbnREaWRNb3VudDpmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLmdldGltYWdlcygpO1xyXG4gICAgICAgfSxcclxuICAgICAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuYW1lOlwiSm9oblwiLFxyXG4gICAgICAgICAgICBpbWFnZXM6W11cclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG5hbWVDaGFuZ2U6IGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe25hbWU6ZXZlbnQudGFyZ2V0LnZhbHVlfSlcclxuICAgICAgICAgIC8vdGhpcy5zdGF0ZS5uYW1lID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2hhbEJleTogZnVuY3Rpb24oKXtcclxuICAgICAgICAgIHZhciB0aGF0PXRoaXM7XHJcbiAgICAgICAgICB0aGlzLnN0YXRlLmltYWdlcy5wdXNoKHRoaXMuc3RhdGUubmFtZSk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnN0YXRlLm5hbWUpO1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgIHVybDogJ2h0dHA6Ly9kYXRhc3RvcmUuYXNhZG1lbW9uLmNvbS9iaWxhbDAwOCcsIFxyXG4gICAgICAgICAgICAgICAgICB0eXBlOiAnUE9TVCcsIFxyXG4gICAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLCBcclxuICAgICAgICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkodGhpcy5zdGF0ZS5pbWFnZXMpLFxyXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzKXtjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgICAgICAgICAgICB0aGF0LmdldGltYWdlcygpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRpbWFnZXM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICB2YXIgdGhhdD10aGlzO1xyXG4gICAgICAgICAgICAkLmdldCgnaHR0cDovL2RhdGFzdG9yZS5hc2FkbWVtb24uY29tL2JpbGFsMDA4JyxmdW5jdGlvbihyZXMpe1xyXG4gICAgICAgICAgICAgIGlmKHJlcy5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICB0aGF0LnNldFN0YXRlKHtpbWFnZXM6cmVzfSk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2codGhhdC5zdGF0ZS5pbWFnZXMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxubW9kdWxlLmV4cG9ydHMgPSBNeUNvbXBvbmVudDI7IiwiICB2YXIgVGh1bWJuYWlsPVJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJUaHVtYm5haWxcIixcclxuICAgICAgcmVuZGVyOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuKFxyXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW1nXCIsIHtzcmM6IHRoaXMucHJvcHMuc291cmNlLCBjbGFzc05hbWU6IFwidGh1bWJcIn0pKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgbW9kdWxlLmV4cG9ydHMgPSBUaHVtYm5haWw7Il19
