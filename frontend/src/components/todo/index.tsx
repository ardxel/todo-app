import { DeleteForeverOutlined, DoneOutline, EditOutlined } from '@material-ui/icons';
import { ITodo } from 'config/models';
import { FC } from 'react';
import { Link } from 'react-router-dom';
interface TODOProps extends ITodo {}

const TODO: FC<TODOProps> = (props) => {
  return (
    <div className='min-h-10 relative flex items-center justify-between rounded-lg bg-slate-300 p-2'>
      <p className='reset-text-margin absolute left-0 top-0 ml-2 mt-1 text-[0.6rem] leading-none text-slate-400'>
        created at: {props.createdAt.toLocaleDateString()}
      </p>
      <p className='reset-text-margin my-3 ml-4 text-slate-700 first-letter:capitalize'>{props.value}</p>
      <p className='reset-text-margin absolute bottom-0 left-0 mb-1 ml-2 text-[0.6rem] leading-none text-slate-400'>
        last modify: {props.updatedAt.toLocaleDateString()}
      </p>
      <div className='mr-1 flex gap-x-2'>
        <button
          // to={`todo/${props.id}/delete`}
          className='btn group relative rounded-xl bg-slate-50 p-1'>
          <DoneOutline className='translate-y-[2px] !p-0 leading-none text-green-500 !transition-transform group-hover:scale-110 ' />
        </button>
        <Link
          to={`todo/${props._id}/delete`}
          className='btn group relative rounded-xl bg-slate-50 p-1'>
          <DeleteForeverOutlined className='translate-y-[2px] !p-0 leading-none text-red-500 !transition-transform group-hover:scale-110 ' />
        </Link>
        <Link
          to={`todo/${props._id}/edit`}
          className='btn group relative rounded-xl bg-slate-50 p-1'>
          <EditOutlined className='translate-y-[2px] !p-0 leading-none text-blue-500 !transition-transform group-hover:scale-110 ' />
        </Link>
      </div>
    </div>
  );
};

export default TODO;
