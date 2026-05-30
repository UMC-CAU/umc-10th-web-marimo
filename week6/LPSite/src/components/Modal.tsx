import { closeModal} from '../store/modal/modalSlice';
import { clearCart } from '../store/slices/cartSlice';
import { useDispatch } from 'react-redux';

export default function Modal() {
  const dispatch = useDispatch();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="w-70 h-32 bg-white p-8 rounded-lg flex flex-col items-center gap-2">
            <p className="font-bold text-black text-lg">장바구니를 비울까요?</p>
            <div className="flex gap-15">
                <button onClick={() => dispatch(closeModal())} 
                    className="w-12 px-6 py-2 bg-gray-300 text-black rounded font-bold">
                    아니요
                </button>
                <button onClick={() => {
                    dispatch(clearCart())
                    dispatch(closeModal())
                }} className="w-12 h-15 px-6 py-2 bg-pink-500 text-white rounded font-pretendard">
                네
                </button>
            </div>
        </div>
    </div>
  )
}