import mongoose, { Document, Schema } from 'mongoose';

export interface ISecurityLog extends Document {
  userId?: mongoose.Types.ObjectId;
  type: 'auth' | 'admin_action' | 'cheating_attempt' | 'suspicious_activity' | 'system';
  action: string;
  details: any;
  ipAddress: string;
  userAgent: string;
  deviceFingerprint?: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  metadata?: any;
  timestamp: Date;
}

const securityLogSchema = new Schema<ISecurityLog>({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  type: {
    type: String,
    enum: ['auth', 'admin_action', 'cheating_attempt', 'suspicious_activity', 'system'],
    required: true
  },
  action: { type: String, required: true },
  details: { type: Schema.Types.Mixed, required: true },
  ipAddress: { type: String, required: true },
  userAgent: { type: String, required: true },
  deviceFingerprint: String,
  severity: {
    type: String,
    enum: ['info', 'warning', 'error', 'critical'],
    default: 'info'
  },
  metadata: Schema.Types.Mixed,
  timestamp: { type: Date, default: Date.now }
});

// Create indexes for efficient querying
securityLogSchema.index({ timestamp: -1 });
securityLogSchema.index({ userId: 1, timestamp: -1 });
securityLogSchema.index({ type: 1, timestamp: -1 });
securityLogSchema.index({ severity: 1, timestamp: -1 });

export default mongoose.model<ISecurityLog>('SecurityLog', securityLogSchema);
