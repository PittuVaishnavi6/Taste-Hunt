
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Shield, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface OTPVerificationProps {
  onVerify: () => void;
  onCancel: () => void;
}

const OTPVerification = ({ onVerify, onCancel }: OTPVerificationProps) => {
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  // Countdown timer for resend OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleVerify = async () => {
    if (otp.length === 6) {
      setIsVerifying(true);
      setVerificationStatus('idle');
      
      // Simulate verification delay
      setTimeout(() => {
        // For demo purposes, accept any 6-digit code except "000000"
        if (otp === "000000") {
          setVerificationStatus('error');
          toast({
            title: "Verification Failed",
            description: "Invalid OTP. Please check and try again.",
            variant: "destructive",
          });
        } else {
          setVerificationStatus('success');
          toast({
            title: "Verification Successful",
            description: "Your order has been verified successfully.",
          });
          setTimeout(() => {
            onVerify();
          }, 1000);
        }
        setIsVerifying(false);
      }, 1500);
    } else {
      setVerificationStatus('error');
      toast({
        title: "Incomplete OTP",
        description: "Please enter the complete 6-digit verification code.",
        variant: "destructive",
      });
    }
  };

  const handleResendOTP = () => {
    setCountdown(30);
    setCanResend(false);
    setOtp('');
    setVerificationStatus('idle');
    toast({
      title: "OTP Resent",
      description: "A new verification code has been sent to your phone.",
    });
  };

  const getStatusIcon = () => {
    switch (verificationStatus) {
      case 'success':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-6 w-6 text-red-500" />;
      default:
        return <Shield className="h-6 w-6 text-primary" />;
    }
  };

  const getStatusMessage = () => {
    switch (verificationStatus) {
      case 'success':
        return <p className="text-green-600 text-sm font-medium">OTP verified successfully!</p>;
      case 'error':
        return <p className="text-red-600 text-sm font-medium">Invalid OTP. Please try again.</p>;
      default:
        return <p className="text-muted-foreground text-sm">Enter the 6-digit code sent to your phone</p>;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh] p-4">
      <Card className="w-full max-w-md mx-auto shadow-lg border-0 bg-gradient-to-b from-background to-muted/30">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                {getStatusIcon()}
              </div>
              {verificationStatus === 'success' && (
                <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping"></div>
              )}
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Verify Your Order</CardTitle>
          {getStatusMessage()}
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <InputOTP 
              value={otp} 
              onChange={setOtp} 
              maxLength={6}
              disabled={isVerifying || verificationStatus === 'success'}
            >
              <InputOTPGroup className="gap-3 justify-center">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <InputOTPSlot 
                    key={index}
                    index={index} 
                    className={`
                      h-12 w-12 text-lg font-bold border-2 rounded-lg transition-all duration-200
                      ${verificationStatus === 'success' 
                        ? 'border-green-500 bg-green-50' 
                        : verificationStatus === 'error' 
                          ? 'border-red-500 bg-red-50' 
                          : 'border-input hover:border-primary focus:border-primary'
                      }
                    `}
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
          
          <div className="flex flex-col gap-3">
            <Button 
              onClick={handleVerify} 
              disabled={otp.length < 6 || isVerifying || verificationStatus === 'success'}
              className="w-full h-12 text-base font-semibold"
            >
              {isVerifying ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Verifying...
                </div>
              ) : verificationStatus === 'success' ? (
                'Verified Successfully'
              ) : (
                'Verify Order'
              )}
            </Button>
            
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                onClick={onCancel}
                disabled={isVerifying}
                className="text-muted-foreground hover:text-foreground"
              >
                Cancel Order
              </Button>
              
              <Button 
                variant="ghost" 
                onClick={handleResendOTP}
                disabled={!canResend || isVerifying || verificationStatus === 'success'}
                className="text-primary hover:text-primary/80 disabled:text-muted-foreground"
              >
                {canResend ? (
                  'Resend OTP'
                ) : (
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {countdown}s
                  </div>
                )}
              </Button>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Didn't receive the code? Check your SMS or contact support
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OTPVerification;
