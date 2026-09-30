import type { ReactNode } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

interface SectionCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function SectionCard({ title, subtitle, children }: SectionCardProps) {
  return (
    <Card variant="outlined" sx={{ height: '100%', borderColor: 'divider' }}>
      <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
        <Box sx={{ mb: 2.5 }}>
          <Typography variant="h6" fontWeight={800}>
            {title}
          </Typography>
          {subtitle ? (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {subtitle}
            </Typography>
          ) : null}
        </Box>
        {children}
      </CardContent>
    </Card>
  );
}
