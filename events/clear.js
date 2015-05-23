module.exports = {
    run: function(connection, collections, data){
        if(data.room == undefined) return {error: "Need to specify roomID!"};
        var roomID = data.room;
        var clearToggle = collections.clearToggle.findWhere({room: roomID});
        if(clearToggle == undefined) return {error: "Need to specify valid roomID!"};
        clearToggle.set('clear', !clearToggle.get('clear'));
        return {};
    }
}
