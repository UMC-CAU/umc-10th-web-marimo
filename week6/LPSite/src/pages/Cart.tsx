import useCartStore from '../store/useCartStore.ts';
import useModalStore from '../store/useModalStore.ts';
import Modal from '../components/Modal.tsx';
import { useEffect } from 'react';

export default function Cart() {
  const { cartItems, amount, total, decrease, increase, removeItem, calculateTotal } = useCartStore();
  const { isOpen, openModal } = useModalStore();

    useEffect(() => {
        calculateTotal();
    }, [cartItems]);

  return (
    <div className="p-8">
        {isOpen && <Modal/>}
        <button onClick={() => openModal()} className="mb-4 px-4 py-2 bg-gray-350 font-bold text-pink-500 rounded">
        전체 삭제
        </button>
    {cartItems.map((item) => (
    <div key={item.id} className="flex items-center gap-4 mb-4">
    {/* 왼쪽: 이미지 */}
    <div className="mt-4">
        <img src={item.img} alt={item.title} className="w-20 h-20 object-cover rounded"/>
    </div>

    {/* 가운데: 제목, 가수, 가격 */}
    <div className="flex flex-col gap-2 flex-1">
        <p className="font-bold">{item.title}</p>
        <p className="text-pink-400">{item.singer}</p>
        <p className="font-bold text-gray-400">{item.price.toLocaleString()}원</p>
    </div>

    {/* 오른쪽: - 수량 + 삭제 */}
    <div className="flex items-center gap-2">
        <button onClick={() => decrease(item.id)} className="w-7 h-7 bg-gray-500 text-white rounded font-bold">-</button>
        <span>{item.amount}</span>
        <button onClick={() => increase(item.id)} className="w-7 h-7 bg-gray-500 text-white rounded font-bold">+</button>
        <button onClick={() => removeItem(item.id)} className="w-9 h-7 bg-pink-500 text-black rounded text-sm font-bold">삭제</button>
        </div>
    </div>

))}

    <p>총 수량: {amount}개</p>
    <p>총 금액: {total.toLocaleString()}원</p>
  </div>
)
}