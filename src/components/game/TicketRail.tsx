import type { Order } from '../../types/game';
import { OrderTicket } from './OrderTicket';

interface Props {
  orders: Order[];
  servableRecipeIds: Set<string>;
  onServe: (id: string) => void;
}

export function TicketRail({ orders, servableRecipeIds, onServe }: Props) {
  return (
    <div className="relative bg-zinc-950/90 border-b border-zinc-800">
      {/* Rail rod */}
      <div className="absolute top-0 left-0 right-0 h-1"
        style={{ background: 'linear-gradient(90deg, #9d4edd, #ff4d8d, #f5c842, #ff4d8d, #9d4edd)', boxShadow: '0 0 10px rgba(157,78,237,0.5)' }} />

      <div className="flex items-start gap-3 px-5 pt-3.5 pb-2 overflow-x-auto min-h-[110px]">
        {orders.length === 0 ? (
          <p className="m-auto text-zinc-600 text-xs font-semibold italic">Waiting for orders…</p>
        ) : (
          orders.map(order => (
            <OrderTicket
              key={order.id}
              order={order}
              canServe={servableRecipeIds.has(order.recipeId)}
              onServe={onServe}
            />
          ))
        )}
      </div>
    </div>
  );
}
