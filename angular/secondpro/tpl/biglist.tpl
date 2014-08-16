<ul id="header">
	<li class="col_{{key}}"ng-repeat="(key, dummy) in list[0]">{{key|headString}}</li>
</ul>
<ul id="data"ng-repeat="(listKey, row) in list" class="{{listKey|oddEven}}">
	<li class="col_{{itemKey}}" ng-repeat='(itemKey, item) in row'>{{item}} </li>
</ul>
