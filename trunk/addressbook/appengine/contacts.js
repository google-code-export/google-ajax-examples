var contacts = [
{% for contact in contacts %}
  {
    id: {{ contact.id }},
    name: '{{ contact.name }}',
    email: '{{ contact.email }}',
    street: '{{ contact.street }}',
    city: '{{ contact.city }}',
    zip: '{{ contact.zip }}',
    state: '{{ contact.state }}',
    phone: '{{ contact.phone }}',
    timestamp: '{{ contact.timestamp }}'
  },
{% endfor %}
];