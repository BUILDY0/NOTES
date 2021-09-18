const promise = (() => {
    // 定义状态
    const PENDING = "pending",
        RESOLVED = "resolved",
        REJECTED = "rejected",
        //定义属性
        PromiseValue = Symbol("PromiseValue"), //值
        PromiseState = Symbol("PromiseState"), //状态
        thenables = Symbol("thenables"), //thenable执行队列
        catchables = Symbol("catchbles"), //catchables执行队列
        //定义函数
        changeState = Symbol("changeState"), //改变状态
        settleHandle = Symbol("settleHandle"), //设置处理函数
        linkPromise = Symbol("linkPromise"); //创建串联的Promise
    return class promise {
        /**
         * 
         * @param {*} executor 要求传进来必须是函数，主函数
         */
        constructor(executor) {
            //默认状态是pending,值为undefined,thenables和catchables队列默认为空数组
            this[PromiseState] = PENDING;
            this[PromiseValue] = undefined;
            this[thenables] = [];
            this[catchables] = [];
            // 函数传进来要默认执行一次，传进来resolve和reject为函数，需要在构造函数内先定义再使用

            const resolve = data => {
                this[changeState](RESOLVED, data, this[thenables])
            }
            const reject = reason => {
                this[changeState](REJECTED, reason, this[catchables])
            }
            try {
                executor(resolve, reject);
            } catch (error) {
                reject(error);
            }
        }

        /**
         * 改变状态函数
         * @param {*} newState 新值
         * @param {*} newValue 新状态
         * @param {*} queue 哪个队列，thenables或catchables
         */
        [changeState](newState, newValue, queue) {
            // 默认只能调用resolve和reject来改变状态，其他的调用要拒绝
            if (this[PromiseState] === PENDING) {
                return;
            }
            this[PromiseState] = newState;
            this[PromiseValue] = newValue;
            // 改变状态后执行对应队列里面的函数
            queue.forEach(handle => {
                handle(newValue);
            });
        }

        /**
         * 设置处理函数
         * @param {*} handle 要设置的处理函数
         * @param {*} isState 匹对状态RESOLVED或REJECTED
         * @param {*} queue 哪个队列，thenables或catchables
         */
        [settleHandle](handle, isState, queue) {
            // handle必须是一个函数
            if (typeof handle !== "function") {
                return;
            }
            // 如果promise对象当前状态和匹对状态一致则直接执行handle函数
            if (this[PromiseState] === isState) {
                // 异步函数用setTimeout来模拟
                setTimeout(() => {
                    // 和执行队列一直
                    handle(this[PromiseValue]);
                }, 0)
            } else {
                // 如果没有匹对，则把该处理函数push进相应的队列
                queue.push(handle);
            }
        }

        /**
         * 串连then和catch方法，方法要求返回一个promise对象
         * @param {*} thenable 
         * @param {*} catchable 
         */
        [linkPromise](thenable, catchable) {
            /**
             * 辅助函数，判断thenable或catchable执行后返回的值是常量还是promise对象，不同的处理方式
             * @param {*} data handle处理函数的实参
             * @param {*} handle 处理函数
             * @param {*} resolve 
             * @param {*} reject 
             */
            const exec = (data, handle, resolve, reject) => {
                try {
                    const result = handle(data);
                    // 对返回值为promise实例对象的，执行一次then方法
                    if (result instanceof promise) {
                        result.then(data => {
                            resolve(data);
                        }, err => {
                            reject(err);
                        })
                    } else {
                        // 返回值为常量就执行一次resolve()改变promise的状态和值
                        resolve(result);
                    }
                } catch (err) {
                    reject(err);
                }
            }

            return new promise((resolve, reject) => {
                // 执行一次settleHandle方法
                this[settleHandle](data => {
                    exec(data, thenable, resolve, reject)
                }, RESOLVED, this[thenables]);

                this[settleHandle](data => {
                    exec(data, catchable, resolve, reject)
                }, REJECTED, this[catchables]);
            })



        }

        // 原型链上的方法
        then(thenable, catchable) {
            return [linkPromise](thenable, catchable);
        };
        catch (thenable, catchable) {
            return [linkPromise](undefined, catchable);
        };
    }
})()