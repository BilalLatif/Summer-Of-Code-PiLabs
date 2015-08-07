  var Thumbnail = require('./Thumbnail');
  var AppDispatcher = require('../Dispatcher');
  var Constants = require('../Constants');
    var Store = require('../Store');
var MyComponent2 = React.createClass({
        render: function(){
          if(!$.isEmptyObject(this.state.images)){
            console.log("in r",this.state.images);
//            for(i in this.state.images){
  var Imgs = this.state.images;
            var newarr=Object.keys(Imgs).map(function(element){

            console.log("in render",Imgs[element].url);
           return <Thumbnail source={Imgs[element].url} />
           });  
  //          }
              
          }
          
          console.log(newarr);
            return (
              <div>
                <input type="text" onChange={this.nameChange}/>
                <button onClick={this.chalBey}>Submit</button><br/>
                {newarr}
              </div>
            );
        },
        componentDidMount:function(){
           // this.getimages();
           Store.addChangeListener(this._onChange);
       },
       componentWillUnmount:function(){
        Store.removeChangeListener(this._onChange);
       },
       _onChange:function(){
          this.setState({images:Store.getAll()});
          console.log("on change",Store.getAll());
       },
        getInitialState: function(){
          return {
            name:"John",
            images:{}
          }
        },
        nameChange: function(event){
          this.setState({name:event.target.value})
          //this.state.name = event.target.value;
        },
        chalBey: function(){
          console.log("chal bey");
         /* var that=this;
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
              });*/
            AppDispatcher.dispatch({
            actionType: Constants.URL_NEW,
            data: this.state.name
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