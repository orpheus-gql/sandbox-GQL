function ResolverTrackerConstructor() {
  this.counts = {};
  this.history = [];
  this.requests = [];
}

ResolverTrackerConstructor.prototype.addEntry = function(resolverName) {
  if (!this.counts[resolverName]) {
    this.counts[resolverName] = 0;
  }
  this.counts[resolverName]++;
  this.history.push(resolverName)
}

ResolverTrackerConstructor.prototype.preRequest = function(context) {
  context._startTime = Date.now();
}

ResolverTrackerConstructor.prototype.postRequest = function(context) {
  // console.log(context);
  if (context._startTime) this.requests.push(Date.now() - context._startTime);
}

module.exports = new ResolverTrackerConstructor();