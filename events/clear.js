module.exports = {
    run: function(connection, collections, data){
        var clearToggle = collections.clearToggle.at(0);
        clearToggle.set('clear', !clearToggle.get('clear'));
        return {};
    }
}
