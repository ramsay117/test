import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

function Debounce() {
  const [pass, setPass] = useState('');

  useEffect(() => {
    const id = setTimeout(() => {
      const invalid = pass.length > 0 && pass.trim().length <= 3;
      if (invalid) {
        const msg = 'Password length must be greater than 3';
        toast.error(msg, { id: 'pwd-len' });
      } else {
        toast.dismiss('pwd-len');
      }
    }, 1000);
    return () => clearTimeout(id);
  }, [pass]);

  return (
    <div>
      <Input type='password' onChange={(e) => setPass(e.target.value)} />
    </div>
  );
}

export default Debounce;
