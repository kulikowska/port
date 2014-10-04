<ul id="data" ng-repeat="(listKey, row) in list" class="{{listKey|oddEven}}">
	<li class="col_{{itemKey}}" ng-repeat='(itemKey, item) in row'>
		<input type="text" ng-model="item" />
	 </li>
</ul>
