var paginateByCardAttribute = function(data, attribute, itemsPerLine, itemsPerGroup) {

  var Builder = {
    numb: 0,
    init: function(dataSet) {
      let finalData = this.breakArray(dataSet);
      this.numb++;

      if (!this.rowCheck(finalData)) return this.init(this.arrayShuffle(dataSet));

      return {
        data: finalData,
        pages: finalData.length,
        times: 'Loops: ' + new Intl.NumberFormat().format(this.numb)
      };
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
          one: Builder.count(currentValue.slice(0,itemsPerLine)),
          two: Builder.count(currentValue.slice(itemsPerLine))
        }

        if (array.length > index + 1) {
          if (count.one !== count.two) previousValue = false;
        }

        // last array
        if (array.length === (index + 1)) {
          if (count.one <= itemsPerLine && count.two === 0) {
            previousValue = previousValue;
          }

          if ((count.one === itemsPerLine && count.two <= itemsPerLine)) {
            previousValue = previousValue;
          }

          if (count.one > itemsPerLine || count.two > itemsPerLine) {
            previousValue = false;
          }

          if ((count.one + count.two) > itemsPerGroup) {
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
