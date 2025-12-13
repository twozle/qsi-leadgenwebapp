import { useState } from 'react';
import { LeadData } from '@/types/lead';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface LeadCaptureFormProps {
  onSubmit: (data: LeadData) => void;
  isLoading: boolean;
}

export default function LeadCaptureForm({ onSubmit, isLoading }: LeadCaptureFormProps) {
  const [formData, setFormData] = useState<LeadData>({
    email: '',
    phone: '',
    preferredContact: 'whatsapp',
    businessType: '',
    weeklySpendRange: '',
    deliveryFrequency: '',
    locationCity: '',
    locationRegion: '',
    biggestFrustration: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!formData.email && !formData.phone) {
      newErrors.email = 'Either email or phone is required';
      newErrors.phone = 'Either email or phone is required';
    }

    if (!formData.businessType) newErrors.businessType = 'Business type is required';
    if (!formData.weeklySpendRange) newErrors.weeklySpendRange = 'Weekly spend range is required';
    if (!formData.deliveryFrequency) newErrors.deliveryFrequency = 'Delivery frequency is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-display font-bold text-stone-900 mb-2">
          Your Results Are Ready!
        </h2>
        <p className="text-stone-600">
          Tell us a bit about your operation so we can tailor your scorecard.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            error={errors.email}
          />

          <Input
            label="Phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(555) 123-4567"
            error={errors.phone}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Preferred Contact Method *
          </label>
          <select
            name="preferredContact"
            value={formData.preferredContact}
            onChange={handleChange}
            className="input-field"
          >
            <option value="whatsapp">WhatsApp</option>
            <option value="sms">SMS</option>
            <option value="email">Email</option>
            <option value="phone">Phone Call</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Business Type *
          </label>
          <select
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Select your business type</option>
            <option value="independent_grocery">Independent Grocery Store</option>
            <option value="small_chain">Small Chain (2-10 locations)</option>
            <option value="restaurant">Restaurant</option>
            <option value="food_truck">Food Truck</option>
            <option value="specialty_retail">Specialty Retailer</option>
            <option value="other">Other</option>
          </select>
          {errors.businessType && (
            <p className="mt-1 text-sm text-red-600">{errors.businessType}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Weekly Produce Spend *
            </label>
            <select
              name="weeklySpendRange"
              value={formData.weeklySpendRange}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select range</option>
              <option value="under_500">Under $500</option>
              <option value="500_1000">$500 - $1,000</option>
              <option value="1000_2500">$1,000 - $2,500</option>
              <option value="2500_5000">$2,500 - $5,000</option>
              <option value="over_5000">Over $5,000</option>
            </select>
            {errors.weeklySpendRange && (
              <p className="mt-1 text-sm text-red-600">{errors.weeklySpendRange}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Delivery Frequency *
            </label>
            <select
              name="deliveryFrequency"
              value={formData.deliveryFrequency}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select frequency</option>
              <option value="daily">Daily</option>
              <option value="2_3_per_week">2-3 times per week</option>
              <option value="weekly">Weekly</option>
              <option value="bi_weekly">Bi-weekly</option>
            </select>
            {errors.deliveryFrequency && (
              <p className="mt-1 text-sm text-red-600">{errors.deliveryFrequency}</p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="City"
            type="text"
            name="locationCity"
            value={formData.locationCity}
            onChange={handleChange}
            placeholder="Los Angeles"
          />

          <Input
            label="State/Region"
            type="text"
            name="locationRegion"
            value={formData.locationRegion}
            onChange={handleChange}
            placeholder="CA"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Biggest Current Frustration (Optional)
          </label>
          <textarea
            name="biggestFrustration"
            value={formData.biggestFrustration}
            onChange={handleChange}
            rows={3}
            className="input-field resize-none"
            placeholder="Tell us about your biggest produce supply challenge..."
          />
        </div>

        <div className="pt-4">
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Calculating Your Score...' : 'Get My Results'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
