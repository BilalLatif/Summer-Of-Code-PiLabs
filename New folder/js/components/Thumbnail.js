  var Thumbnail=React.createClass({
      render:function(){
        return(
          <div><img src={this.props.source} className="thumb"/></div>
          );
      }
    });
  module.exports = Thumbnail;