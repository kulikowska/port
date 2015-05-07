var DATA_URI   = '/data/vocab/dictionary';
var RECENT_URI = '/data/vocab/recent';
var MAX_RECENT_WORDS = 12;

var App = {

  data   : null,
  recent : null,

  /**
   * Sets header message
   */
  setMessage : function(msg)
  {
    $('#message').text(msg);
  },

  /**
   * Writes local data to server
   */
  persistData : function()
  {
    App.setMessage('Saving...');
    $.ajax({
      url  : DATA_URI,
      type : 'PUT',
      data : JSON.stringify(App.data),
      success : function() { App.setMessage('Changes saved'); },
      error   : function() { App.setMessage('Failed to sync to server'); }
    });
  },

  /**
   * TODO: clean all this up
   */
  addRecent : function(obj)
  {
    App.recent.unshift(obj);
    if (App.recent.length > MAX_RECENT_WORDS) {
      App.recent.pop();
    }

    $.ajax({
      url  : RECENT_URI,
      type : 'PUT',
      data : JSON.stringify(App.recent)
    });
  },

  /**
   * Adds new word
   */
  add : function(e)
  {
    e.preventDefault();
    var obj = {
      word        : App.dom.word.val(),
      translation : App.dom.translation.val()
    };

    App.data.splice(_.sortedIndex(App.data, obj, 'word'), 0, obj);
    App.addRecent(obj);

    App.persistData();
    App.refreshView();
  },

  /**
   * delete
   */
  delete : function(e)
  {
    e.preventDefault();

    var li = $(e.target).parents('li').first();
    var word = li.find('p:eq(0)').text();

    if (!confirm('Are you sure you want to delete "' + word + '"?')) {
      return;
    }

    var index = _.sortedIndex(App.data, { word : word }, 'word');

    if (App.data[index].word !== word) { // shouldn't happen
      console.warn('Item to delete can not be found in local database');
      return;
    }

    App.data.splice(index, 1);

    App.persistData();
    App.refreshView();
  },

  /**
   * Shows words similar to what is being typed in
   */
  refreshDictionary : function(e)
  {
    var word = App.dom.word.val();

    var found = _.findWhere(App.data, { 'word' : word });
    if (found) {
      App.dom.translation.val(found.translation).attr('disabled', 'disabled');
    } else {
      App.dom.translation.val('').removeAttr('disabled');
    }
    App.dom.add.hide();

    var insertIndex = _.sortedIndex(App.data, { word : word }, 'word');

    var populateLi = function(li, i)
    {
      var data = (i >= 0 && i < App.data.length) ? App.data[i] : null;

      li.find('p:eq(0)').text(data ? data.word        : '-');
      li.find('p:eq(1)').text(data ? data.translation : '-');
      if (data) {
        li.find('button.delete').show();
      } else {
        li.find('button.delete').hide();
      }
    };

    var li;

    // walk forward from the form item populating matches
    i = insertIndex + (found ? 1 : 0); // skip item if it's already in the list
    for (li = App.dom.formLi.next(); li.length; li = li.next()) { populateLi(li, i++); }

    // walk backwards from the form item populating matches
    var i = insertIndex - 1;
    for (li = App.dom.formLi.prev(); li.length; li = li.prev()) { populateLi(li, i--); }
  },

  /**
   * Refreshes recent items
   */
  refreshRecent : function()
  {
    App.dom.recentUl.empty();

    for (var i = 0; i < App.recent.length; i++) {
      var li = $('<li><p></p><p></p></li>');
      li.find('p:eq(0)').text(App.recent[i].word);
      li.find('p:eq(1)').text(App.recent[i].translation);
      App.dom.recentUl.append(li);
    }
  },

  /**
   * Refreshes content panes
   */
  refreshView : function()
  {
    App.refreshDictionary();
    App.refreshRecent();
  },

  /**
   * Enable add button if there is translation text
   */
  enableAdd : function()
  {
    if (App.dom.translation.val().length) {
      App.dom.add.show();
    } else {
      App.dom.add.hide();
    }
  },

  /**
   *
   */
  fetchDictionary : function()
  {
    var ready = new $.Deferred();

    $.ajax({
      url      : DATA_URI,
      datatype : 'json',
      success  : function(resp) {
        App.setMessage('ready');
        loaded(resp);
      },
      error : function(xhr) {
        if (xhr.status == 404) {
          App.setMessage('Server has no data');
          loaded([]);
        } else {
          App.setMessage('FAILED!');
          ready.reject();
        }
      }
    });

    var loaded = function(data)
    {
      App.data = _.sortBy(data, 'word');
      ready.resolve();
    };

    return ready.promise();
  },

  /**
   *
   */
  fetchRecent : function()
  {
    var ready = new $.Deferred();

    $.ajax({
      url      : RECENT_URI,
      datatype : 'json',
      success  : function(resp) {
        loaded(resp);
      },
      error : function(xhr) {
        if (xhr.status == 404) {
          loaded([]);
        } else {
          ready.reject();
        }
      }
    });

    var loaded = function(data)
    {
      App.recent = data;
      ready.resolve();
    };

    return ready.promise();
  },

  /**
   * Set up app
   */
  start : function()
  {
    //
    // load data
    //
    App.setMessage('Loading data');

    $.when(
      App.fetchDictionary(),
      App.fetchRecent()
    ).then(App.refreshView);

    //
    // build dom references
    //
    App.dom = {
      formLi      : $('#form'),
      word        : $('#form input[name=word]'),
      translation : $('#form input[name=translation]'),
      add         : $('#form button.add'),
      deletes     : $('ul button.delete'),
      before      : $('#before'),
      after       : $('#after'),
      recentUl    : $('div.recent > ul'),
    };

    //
    // bind events
    //
    App.dom.add.bind('click',          App.add);
    App.dom.deletes.bind('click',      App.delete);
    App.dom.word.bind('change',        App.refreshView);
    App.dom.word.bind('keyup',         App.refreshView);
    App.dom.translation.bind('change', App.enableAdd);
    App.dom.translation.bind('keyup',  App.enableAdd);
  }
};

$(App.start);
