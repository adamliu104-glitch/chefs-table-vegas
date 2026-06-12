import type { Order } from '../../types/game';
import { OrderTicket } from './OrderTicket';

interface Props {
  orders: Order[];
  servableRecipeIds: Set<string>;
  onServe: (id: string) => void;
}

export function TicketRail({ orders, servableRecipeIds, onServe }: Props) {
  return (
    <div className="relative" style={{ background: 'var(--sky-deep)', borderBottom: '3px solid var(--ink)' }}>
      {/* Wooden rail rod */}
      <div className="absolute top-0 left-0 right-0 h-2.5 z-10"
        style={{
          background: 'linear-gradient(180deg, var(--wood) 0%, var(--wood-deep) 100%)',
          borderBottom: '3px solid var(--ink)',
        }} />

      <div className="flex items-start gap-4 px-5 pt-6 pb-3 overflow-x-auto min-h-[118px]">
        {orders.length === 0 ? (
          <p className="m-auto font-display text-base" style={{ color: 'rgba(255,255,255,0.85)', textShadow: '0 2px 0 rgba(74,41,18,0.4)' }}>
            Waiting for orders… 💤
          </p>
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
