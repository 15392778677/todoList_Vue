

function Random_id()
{
    return Number(Math.random().toString().substr(2,0)+ Date.now()).toString(10);
}

//�ǵ� ����savePoint����
export default Random_id;