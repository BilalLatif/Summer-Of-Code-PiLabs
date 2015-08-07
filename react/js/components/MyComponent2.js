  var Thumbnail = require('./Thumbnail');
var MyComponent2 = React.createClass({
        render: function(){
          var newarr=this.state.images.map(function(element){
          return <Thumbnail source={element} />
        });
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