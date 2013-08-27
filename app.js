(function(){
 
  return {
    appID:  'Prepend Subject Line',
    defaultState: 'loading',
    thereAreNulls: [undefined, null, '', 'no'],
    events: {
      'app.activated': 'isLoaded',
      'ticket.custom_field_21631456.changed': 'checkValue'
    }, //end events

    isLoaded: function(){
      var requesterEmail = this.ticket().requester() && this.ticket().requester().email();
      if ( requesterEmail === null ) { return; }
      this.checkValue();
    },
    checkValue: function() {
      var customerField = this.ticket().customField('custom_field_' + this.settings.Custom_Field_ID);
      if(_.indexOf(this.thereAreNulls, customerField) !== -1) {
       this.ticket().customField('custom_field_' + this.settings.Custom_Field_ID, this.settings.Custom_Field_Default);
       this.changedValue();
      }
    },
    changedValue: function() {
      var alreadyLabeled = new RegExp(/^\[.*\]/i);
      var ticketSubject = this.ticket().subject();
      var customerField = this.ticket().customField('custom_field_' + this.settings.Custom_Field_ID);
      console.log(alreadyLabeled.test(ticketSubject));
      console.log(alreadyLabeled.exec(ticketSubject));
    }
  };
}());
