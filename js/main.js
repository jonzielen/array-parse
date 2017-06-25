var paginateByCardAttribute = function(data, attribute, itemsPerLine, itemsPerGroup) {

  var Builder = {
    init: function(dataSet) {
      let finalData = this.breakArray(dataSet);

      if (this.rowCheck(finalData)) {
        return {
          data: finalData,
          pages: finalData.length
        }
      } else {
        return this.init(this.arrayShuffle(dataSet));
      }
    },
    arrayShuffle: function(a) {
      for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
      }

      return a;
    },
    count: function(items) {
      return items.reduce(function(previousValue, currentValue) {
        return previousValue + currentValue[attribute];
      }, 0);
    },
    rowCheck: function(array) {
      let validRowCheck = array.reduce(function(previousValue, currentValue, index, array) {
        let count = {
          one: currentValue.slice(0,itemsPerLine),
          two: currentValue.slice(itemsPerLine)
        }

        if (array.length > index + 1) {
          if (Builder.count(count.one) !== Builder.count(count.two)) previousValue = false;
        }

        // last array
        if (array.length === (index + 1)) {
          if (Builder.count(count.one) <= itemsPerLine && Builder.count(count.two) === 0) {
            previousValue = previousValue;
          }

          if ((Builder.count(count.one) === itemsPerLine && Builder.count(count.two) <= itemsPerLine)) {
            previousValue = previousValue;
          }

          if (Builder.count(count.one) > itemsPerLine || Builder.count(count.two) > itemsPerLine) {
            previousValue = false;
          }

          if ((Builder.count(count.one) + Builder.count(count.two)) > itemsPerGroup) {
            previousValue = false;
          }
        }

        return previousValue;
      }, true);

      return validRowCheck;
    },
    setCheck: function(chunk) {
      return (Builder.count(chunk) % itemsPerGroup) === 0;
    },
    breakArray: function(data) {
      let pages = [],
          chunk = [];

      data.forEach((item, index, array) => {
        if (index > 0 && Builder.setCheck(chunk)) {
          pages.push(chunk);
          chunk = [];
        }

        chunk.push(item);

        if (array.length === (index + 1)) pages.push(chunk);
      });

      return pages;
    },
  };

  return Builder.init(data);
};
