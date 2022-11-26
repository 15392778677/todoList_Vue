

function Random_id()
{
    return Number(Math.random().toString().substr(2,0)+ Date.now()).toString(10);
}

//记得 交出savePoint函数
export default Random_id;